using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TripSharing.Application.Photos;

namespace TripSharing.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);

        Task<string> DeletePhoto(string publicId);
    }
}