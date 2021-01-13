using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gifter.Models;
using Microsoft.EntityFrameworkCore;

namespace Gifter.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<Comment> Comment { get; set; }
    }
}
