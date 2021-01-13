using Gifter.Models;
using System.Collections.Generic;

namespace Gifter.Repositories
{
    public interface ICommentRepository
    {
        public List<Comment> GetAll();

        public Comment GetById(int id);

        public List<Comment> GetByUserProfileId(int id);

        public List<Comment> GetCommentsByPostId(int id);

        public void Add(Comment comment);

        public void Update(Comment comment);

        public void Delete(int id);
    }
}