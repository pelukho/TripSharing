import {ChatComment} from "../models/Comment";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {makeAutoObservable, runInAction} from "mobx";
import {store} from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (tripId: string) => {
        if (store.tripStore.selectedTrip) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/comment?tripId=" + tripId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information).build();
            
            this.hubConnection.start().catch(e => console.log("Error connection: ", e));
            
            this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments;
                });
            });
            
            this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment);
                });
            });
        }
    };
    
    stopHubConnection = () => {
        this.hubConnection?.stop().catch(e => console.log('Error stopping connection: ', e));
    };
    
    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    };
    
    addComment = async (values: any) => {
        values.tripId = store.tripStore.selectedTrip?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values)
        } catch (e) {
            console.log(e);
        }
    };
}