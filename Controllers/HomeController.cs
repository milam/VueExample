using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using VueContactTableExample.Models;

namespace VueContactTableExample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SubmittedForm([FromBody] ContactModel form)
        {
            string message = "";
            //Submit new entry
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ContactDBConnectionString"].ConnectionString);
                conn.Open();
                string insertQuery = "insert into RegisterDataBase(StudentName,Passwords,EmailId,Department,College)values (@studentname,@passwords,@emailid,@department,@college)";
                SqlCommand cmd = new SqlCommand(insertQuery, conn);
                cmd.Parameters.AddWithValue("@firstname", form.FirstName);
                cmd.Parameters.AddWithValue("@lastname", form.LastName);
                cmd.Parameters.AddWithValue("@state", form.State);
                cmd.Parameters.AddWithValue("@city", form.City);
                cmd.Parameters.AddWithValue("@zip", form.Zip);
                cmd.Parameters.AddWithValue("@address", form.Address);
                cmd.Parameters.AddWithValue("@phone", form.Phone);
                cmd.Parameters.AddWithValue("@email", form.Email);
                cmd.ExecuteNonQuery();

                message = "{Response: Contact Added}";

                conn.Close();

            }
            catch (Exception ex)
            {
                message = "{Response: Contact Add Error}" + ex.ToString();
            }



            return Json(new { message });
        }

        public IActionResult ReturnTableJSON()
        {
            string message = "";

            // Retrieve database
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ContactDBConnectionString"].ConnectionString);
            conn.Open();
            string retrieveAll = "select * from ContactDataBase FOR JSON AUTO";
            SqlCommand cmd = new SqlCommand(retrieveAll, conn);
            message = cmd.ExecuteReader().Read().ToString();

            conn.Close();

            return Json(new { message });
        }

        public IActionResult InitializeTable()
        {
            string message = "";

            // Retrieve database
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ContactDBConnectionString"].ConnectionString);
            conn.Open();
            string retrieveAll = "select * from ContactDataBase FOR JSON AUTO";
            SqlCommand cmd = new SqlCommand(retrieveAll, conn);
            message = cmd.ExecuteReader().Read().ToString();

            conn.Close();

            return Json(new { message });
        }

        /*
                public IActionResult Privacy()
                {
                    return View();
                }*/

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
