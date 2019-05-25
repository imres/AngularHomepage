using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Repositories;

namespace UserManager.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly masterEntitiesMYSQL _context;

        public UnitOfWork(masterEntitiesMYSQL context)
        {
            _context = context;

            ActiveConsignment = new ActiveConsignmentRepository(_context);
            Consignment = new ConsignmentRepository(_context);
            Invitation = new InvitationRepository(_context);
            PackageInformation = new PackageInformationRepository(_context);
            Payment = new PaymentRepository(_context);
            Person = new PersonRepository(_context);
        }
        
        public ActiveConsignmentRepository ActiveConsignment { get; private set; }

        public ConsignmentRepository Consignment { get; private set; }

        public InvitationRepository Invitation { get; private set; }

        public PackageInformationRepository PackageInformation { get; private set; }

        public PaymentRepository Payment { get; private set; }

        public PersonRepository Person { get; private set; }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}