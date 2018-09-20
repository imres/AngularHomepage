using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManager.Core.Repositories;

namespace UserManager.Core
{
    public interface IUnitOfWork : IDisposable
    {
        ActiveConsignmentRepository ActiveConsignment { get; }
        ConsignmentRepository Consignment { get; }
        InvitationRepository Invitation { get; }
        PackageInformationRepository PackageInformation { get; }
        PaymentRepository Payment { get; }
        PersonRepository Person { get; }
        int Save();
    }
}
