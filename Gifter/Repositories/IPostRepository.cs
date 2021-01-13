using Gifter.Models;
using System.Collections.Generic;

namespace Gifter.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById(int id);
        List<Post> GetByUserProfileId(int id);
        public void Add(Post post);

        public void Update(Post post);

        public void Delete(int id);
    }
}