using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class PersonRepository : Repository<Person>, IPersonRepository
    {
        protected PersonCrypography _personCryptography = new PersonCrypography();

        public PersonRepository(masterEntities context) : base(context)
        {

        }

        /// <summary>
        /// Add new Person
        /// </summary>
        /// <param name="personDTO"></param>
        public Person AddPerson(IPerson personDTO)
        {
            var entity = Mapper.Map<Person>(personDTO);

            Context.Person.Add(entity);
            Context.SaveChanges();

            return entity;
        }

        /// <summary>
        /// Authenticate Person credentials
        /// </summary>
        /// <param name="personDTO"></param>
        /// <returns></returns>
        public PersonDTO Authenticate(PersonDTO personDTO)
        {
            //Hitta matchande användare. returnera res 200 & token
            using (masterEntities context = new masterEntities())
            {
                //Users nullUser = null;
                IEnumerable<Person> findPerson = context.Person.Where(x => x.Email == personDTO.Email && x.Password == personDTO.Password);

                var matchedPerson = findPerson != null && findPerson.Count() > 0 ? findPerson.FirstOrDefault() : null;

                var matchedPersonDTO = Mapper.Map<PersonDTO>(matchedPerson);

                if (matchedPerson == null)
                    throw new ArgumentException("InvalidCredentials");

                return _personCryptography.GenerateSignature(matchedPersonDTO);
            }
        }

        public PersonDTO AuthenticateBankId(BankIdCollectDto collectDto)
        {
            //Users nullUser = null;
            Person findPerson = Context.Person.Where(x => x.PersonId == collectDto.completionData.user.personalNumber).FirstOrDefault();

            //var matchedPerson = findPerson != null ? findPerson : null;
            if (findPerson == null)
                return null;

            var matchedPersonDTO = Mapper.Map<PersonDTO>(findPerson);

            return _personCryptography.GenerateSignature(matchedPersonDTO);
        }

    }
}