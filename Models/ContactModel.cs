using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueContactTableExample.Models
{
    public class ContactModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
