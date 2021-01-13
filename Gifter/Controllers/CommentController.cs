using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Gifter.Data;
using Gifter.Models;
using Gifter.Repositories;

namespace Gifter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_commentRepository.GetByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
