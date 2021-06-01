using CustomerWebApi.EntityModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CustomerWebApi.Controllers
{
    public class ValuesController : ApiController
    {
       private customerEntities db = null;

        public ValuesController()
        {
            db = new customerEntities();
        }

        // GET api/values
        public IEnumerable<customer> Get()
        {
            return db.customers.ToList();
            //return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public HttpResponseMessage GetById(int id)
        {
           customer cust= db.customers.FirstOrDefault(x => x.CustId == id);

            return Request.CreateResponse(HttpStatusCode.OK, cust);
        }

        // POST api/values
        public void Post(customer obj)
        {
            db.customers.Add(obj);
            db.SaveChanges();
        }

        // PUT api/values/5
        public HttpResponseMessage Put(customer obj)
        {
            try
            {
                db.Entry(obj).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch(Exception ex)
            {
              return  Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            var customer = db.customers.FirstOrDefault(x => x.CustId == id);

            db.customers.Attach(customer);
            db.customers.Remove(customer);
            db.SaveChanges();
        }
    }
}
