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
        [HttpGet("/SearchByTitle")]
       
        public async Task<Movie> SearchByTitle(string title)
        {
            var movie = new Movie();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("http://www.omdbapi.com/?apikey=a906d0e6&t=" + title))
                {

                  var res = await response.Content.ReadAsStringAsync();
                    try
                    {
                        movie = JsonConvert.DeserializeObject<Movie>(res);
                    }catch( Exception ex)
                    {
                        var err = ex.Message;
                       // return BadRequest();
                    }
                    return movie;
          
                }
            }
        }
    }
}