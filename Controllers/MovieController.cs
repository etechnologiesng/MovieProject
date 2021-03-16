using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieProject.Models;
using Newtonsoft.Json;

namespace MovieProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        [HttpGet("SearchByTitle")]
       
        public async Task<string> SearchByTitle(string title)
        {
           
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("http://www.omdbapi.com/?apikey=a906d0e6&t=" + title))
                {
                   return await response.Content.ReadAsStringAsync();
          
                }
            }
        }
    }
}