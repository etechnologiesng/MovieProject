using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public string Value { get; set; }
    }
}
