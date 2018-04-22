using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UserManager.DTO
{
    [DataContract]
    public class ParamValue
    {
        [DataMember]
        public string param { get; set; }
        [DataMember]
        public string value { get; set; }
    }

    [DataContract]
    public class Fault
    {
        [DataMember]
        public string faultCode { get; set; }
        [DataMember]
        public string explanationText { get; set; }
        [DataMember]
        public List<ParamValue> paramValues { get; set; }
    }

    [DataContract]
    public class CompositeFault
    {
        [DataMember]
        public List<Fault> faults { get; set; }
    }

    [DataContract]
    public class Service
    {
        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string sourceSystem { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string articleNumber { get; set; }
    }

    [DataContract]
    public class Customer
    {
        [DataMember]
        public string productionCustomerNumber { get; set; }
        [DataMember]
        public string externalCustomerNumber { get; set; }
        [DataMember]
        public string sapCustomerNumber { get; set; }
    }

    [DataContract]
    public class Address
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class Consignor
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string issuercode { get; set; }
        [DataMember]
        public Customer customer { get; set; }
        [DataMember]
        public Address address { get; set; }
        [DataMember]
        public Contact contact { get; set; }
    }

    [DataContract]
    public class Address2
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact2
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class Customer2
    {
        [DataMember]
        public string productionCustomerNumber { get; set; }
        [DataMember]
        public string externalCustomerNumber { get; set; }
        [DataMember]
        public string sapCustomerNumber { get; set; }
    }

    [DataContract]
    public class Consignee
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Address2 address { get; set; }
        [DataMember]
        public Contact2 contact { get; set; }
        [DataMember]
        public Customer2 customer { get; set; }
    }

    [DataContract]
    public class Address3
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Customer3
    {
        [DataMember]
        public string productionCustomerNumber { get; set; }
        [DataMember]
        public string externalCustomerNumber { get; set; }
        [DataMember]
        public string sapCustomerNumber { get; set; }
    }

    [DataContract]
    public class Contact3
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class OriginalShipper
    {
        [DataMember]
        public Address3 address { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Customer3 customer { get; set; }
        [DataMember]
        public Contact3 contact { get; set; }
        [DataMember]
        public string issuercode { get; set; }
    }

    [DataContract]
    public class Customer4
    {
        [DataMember]
        public string productionCustomerNumber { get; set; }
        [DataMember]
        public string externalCustomerNumber { get; set; }
        [DataMember]
        public string sapCustomerNumber { get; set; }
    }

    [DataContract]
    public class Contact4
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class FreightPayer
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Customer4 customer { get; set; }
        [DataMember]
        public Contact4 contact { get; set; }
    }

    [DataContract]
    public class Address4
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact5
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class ReturnParty
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Address4 address { get; set; }
        [DataMember]
        public Contact5 contact { get; set; }
    }

    [DataContract]
    public class Address5
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact6
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class PickupParty
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Address5 address { get; set; }
        [DataMember]
        public Contact6 contact { get; set; }
    }

    [DataContract]
    public class Address6
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact7
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class CollectionParty
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Address6 address { get; set; }
        [DataMember]
        public Contact7 contact { get; set; }
    }

    [DataContract]
    public class Address7
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact8
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class NotificationParty
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Address7 address { get; set; }
        [DataMember]
        public Contact8 contact { get; set; }
    }

    [DataContract]
    public class CashOnDelivery
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string currency { get; set; }
    }

    [DataContract]
    public class StatusText
    {
        [DataMember]
        public string header { get; set; }
        [DataMember]
        public string body { get; set; }
        [DataMember]
        public string estimatedTimeOfArrival { get; set; }
    }

    [DataContract]
    public class Address8
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact9
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class Coordinate
    {
        [DataMember]
        public string srId { get; set; }
        [DataMember]
        public string northing { get; set; }
        [DataMember]
        public string easting { get; set; }
    }

    [DataContract]
    public class OpeningHour
    {
        [DataMember]
        public string openFrom { get; set; }
        [DataMember]
        public string openTo { get; set; }
        [DataMember]
        public string openFrom2 { get; set; }
        [DataMember]
        public string openTo2 { get; set; }
        [DataMember]
        public bool monday { get; set; }
        [DataMember]
        public bool tuesday { get; set; }
        [DataMember]
        public bool wednesday { get; set; }
        [DataMember]
        public bool thursday { get; set; }
        [DataMember]
        public bool friday { get; set; }
        [DataMember]
        public bool saturday { get; set; }
        [DataMember]
        public bool sunday { get; set; }
    }

    [DataContract]
    public class RequestedDeliveryPoint
    {
        [DataMember]
        public string locationDetail { get; set; }
        [DataMember]
        public Address8 address { get; set; }
        [DataMember]
        public Contact9 contact { get; set; }
        [DataMember]
        public List<Coordinate> coordinate { get; set; }
        [DataMember]
        public List<OpeningHour> openingHour { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string displayName { get; set; }
        [DataMember]
        public string locationId { get; set; }
        [DataMember]
        public string postcode { get; set; }
        [DataMember]
        public string servicePointType { get; set; }
        [DataMember]
        public string locationType { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string city { get; set; }
    }

    [DataContract]
    public class Address9
    {
        [DataMember]
        public string street1 { get; set; }
        [DataMember]
        public string street2 { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postCode { get; set; }
    }

    [DataContract]
    public class Contact10
    {
        [DataMember]
        public string contactName { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mobilePhone { get; set; }
        [DataMember]
        public string email { get; set; }
    }

    [DataContract]
    public class Coordinate2
    {
        [DataMember]
        public string srId { get; set; }
        [DataMember]
        public string northing { get; set; }
        [DataMember]
        public string easting { get; set; }
    }

    [DataContract]
    public class OpeningHour2
    {
        [DataMember]
        public string openFrom { get; set; }
        [DataMember]
        public string openTo { get; set; }
        [DataMember]
        public string openFrom2 { get; set; }
        [DataMember]
        public string openTo2 { get; set; }
        [DataMember]
        public bool monday { get; set; }
        [DataMember]
        public bool tuesday { get; set; }
        [DataMember]
        public bool wednesday { get; set; }
        [DataMember]
        public bool thursday { get; set; }
        [DataMember]
        public bool friday { get; set; }
        [DataMember]
        public bool saturday { get; set; }
        [DataMember]
        public bool sunday { get; set; }
    }

    [DataContract]
    public class DeliveryPoint
    {
        [DataMember]
        public string locationDetail { get; set; }
        [DataMember]
        public Address9 address { get; set; }
        [DataMember]
        public Contact10 contact { get; set; }
        [DataMember]
        public List<Coordinate2> coordinate { get; set; }
        [DataMember]
        public List<OpeningHour2> openingHour { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string displayName { get; set; }
        [DataMember]
        public string locationId { get; set; }
        [DataMember]
        public string postcode { get; set; }
        [DataMember]
        public string servicePointType { get; set; }
        [DataMember]
        public string locationType { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string city { get; set; }
    }

    [DataContract]
    public class PaymentAccount
    {
        [DataMember]
        public string accountNumber { get; set; }
        [DataMember]
        public string bic { get; set; }
        [DataMember]
        public string accountType { get; set; }
    }

    [DataContract]
    public class TotalWeight
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class TotalVolume
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class AssessedWeight
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class AssessedVolume
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class SplitStatus
    {
        [DataMember]
        public int noItemsWithStatus { get; set; }
        [DataMember]
        public int noItems { get; set; }
        [DataMember]
        public string statusDescription { get; set; }
        [DataMember]
        public string status { get; set; }
    }

    [DataContract]
    public class ShipmentReference
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public string name { get; set; }
    }

    [DataContract]
    public class AdditionalService
    {
        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string sourceSystem { get; set; }
        [DataMember]
        public string nameKey { get; set; }
        [DataMember]
        public string name { get; set; }
    }

    [DataContract]
    public class StatusText2
    {
        [DataMember]
        public string header { get; set; }
        [DataMember]
        public string body { get; set; }
        [DataMember]
        public string estimatedTimeOfArrival { get; set; }
    }

    [DataContract]
    public class Acceptor
    {
        [DataMember]
        public string signatureReference { get; set; }
        [DataMember]
        public string name { get; set; }
    }

    [DataContract]
    public class Weight
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Length
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Height
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Width
    {
        [DataMember]
        public int value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Volume
    {
        [DataMember]
        public int value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Compass
    {
        [DataMember]
        public int value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class CompassPlusLength
    {
        [DataMember]
        public int value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Bag
    {
        [DataMember]
        public bool bag { get; set; }
    }

    [DataContract]
    public class StatedMeasurement
    {
        [DataMember]
        public Weight weight { get; set; }
        [DataMember]
        public Length length { get; set; }
        [DataMember]
        public Height height { get; set; }
        [DataMember]
        public Width width { get; set; }
        [DataMember]
        public Volume volume { get; set; }
        [DataMember]
        public Compass compass { get; set; }
        [DataMember]
        public CompassPlusLength compassPlusLength { get; set; }
        [DataMember]
        public Bag bag { get; set; }
    }

    [DataContract]
    public class Weight2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Length2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Height2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Width2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Volume2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Compass2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class CompassPlusLength2
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string unit { get; set; }
    }

    [DataContract]
    public class Bag2
    {
        [DataMember]
        public bool bag { get; set; }
    }

    [DataContract]
    public class AssessedMeasurement
    {
        [DataMember]
        public Weight2 weight { get; set; }
        [DataMember]
        public Length2 length { get; set; }
        [DataMember]
        public Height2 height { get; set; }
        [DataMember]
        public Width2 width { get; set; }
        [DataMember]
        public Volume2 volume { get; set; }
        [DataMember]
        public Compass2 compass { get; set; }
        [DataMember]
        public CompassPlusLength2 compassPlusLength { get; set; }
        [DataMember]
        public Bag2 bag { get; set; }
    }

    [DataContract]
    public class Location
    {
        [DataMember]
        public string locationId { get; set; }
        [DataMember]
        public string displayName { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string countryCode { get; set; }
        [DataMember]
        public string country { get; set; }
        [DataMember]
        public string postcode { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string servicePointType { get; set; }
        [DataMember]
        public string locationType { get; set; }
    }

    [DataContract]
    public class Event
    {
        [DataMember]
        public DateTime eventTime { get; set; }
        [DataMember]
        public string eventCode { get; set; }
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string eventDescription { get; set; }
        [DataMember]
        public string localEventCode { get; set; }
        [DataMember]
        public string scanUserId { get; set; }
        [DataMember]
        public Location location { get; set; }
    }

    [DataContract]
    public class Reference
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public string name { get; set; }
    }

    [DataContract]
    public class ItemRefId
    {
        [DataMember]
        public string referenceId { get; set; }
        [DataMember]
        public string type { get; set; }
    }

    [DataContract]
    public class FreeText
    {
        [DataMember]
        public string text { get; set; }
        [DataMember]
        public string type { get; set; }
    }

    [DataContract]
    public class Item
    {
        [DataMember]
        public string itemId { get; set; }
        [DataMember]
        public string originEstimatedTimeOfArrival { get; set; }
        [DataMember]
        public string estimatedTimeOfArrival { get; set; }
        [DataMember]
        public string realTimeOfArrival { get; set; }
        [DataMember]
        public DateTime dropOffDate { get; set; }
        [DataMember]
        public DateTime deliveryDate { get; set; }
        [DataMember]
        public string typeOfItem { get; set; }
        [DataMember]
        public string typeOfItemName { get; set; }
        [DataMember]
        public string typeOfItemActual { get; set; }
        [DataMember]
        public string typeOfItemActualName { get; set; }
        [DataMember]
        public string additionalInformation { get; set; }
        [DataMember]
        public int noItems { get; set; }
        [DataMember]
        public string numberOfPallets { get; set; }
        [DataMember]
        public string signature { get; set; }
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string eventStatus { get; set; }
        [DataMember]
        public StatusText2 statusText { get; set; }
        [DataMember]
        public Acceptor acceptor { get; set; }
        [DataMember]
        public StatedMeasurement statedMeasurement { get; set; }
        [DataMember]
        public AssessedMeasurement assessedMeasurement { get; set; }
        [DataMember]
        public List<Event> events { get; set; }
        [DataMember]
        public List<Reference> reference { get; set; }
        [DataMember]
        public List<ItemRefId> itemRefId { get; set; }
        [DataMember]
        public List<FreeText> freeText { get; set; }
    }

    [DataContract]
    public class Shipment
    {
        [DataMember]
        public string shipmentId { get; set; }
        [DataMember]
        public string uri { get; set; }
        [DataMember]
        public int assessedNumberOfItems { get; set; }
        [DataMember]
        public string cashOnDeliveryText { get; set; }
        [DataMember]
        public DateTime deliveryDate { get; set; }
        [DataMember]
        public DateTime originEstimatedTimeOfArrival { get; set; }
        [DataMember]
        public DateTime estimatedTimeOfArrival { get; set; }
        [DataMember]
        public DateTime realTimeOfArrival { get; set; }
        [DataMember]
        public DateTime requestedDeliveryDate { get; set; }
        [DataMember]
        public DateTime requestedProductionDate { get; set; }
        [DataMember]
        public string notificationPhoneNumber { get; set; }
        [DataMember]
        public string notificationCode { get; set; }
        [DataMember]
        public string customerNumber { get; set; }
        [DataMember]
        public string numberOfPallets { get; set; }
        [DataMember]
        public Service service { get; set; }
        [DataMember]
        public Consignor consignor { get; set; }
        [DataMember]
        public Consignee consignee { get; set; }
        [DataMember]
        public OriginalShipper originalShipper { get; set; }
        [DataMember]
        public FreightPayer freightPayer { get; set; }
        [DataMember]
        public ReturnParty returnParty { get; set; }
        [DataMember]
        public PickupParty pickupParty { get; set; }
        [DataMember]
        public CollectionParty collectionParty { get; set; }
        [DataMember]
        public NotificationParty notificationParty { get; set; }
        [DataMember]
        public CashOnDelivery cashOnDelivery { get; set; }
        [DataMember]
        public StatusText statusText { get; set; }
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public RequestedDeliveryPoint requestedDeliveryPoint { get; set; }
        [DataMember]
        public DeliveryPoint deliveryPoint { get; set; }
        [DataMember]
        public PaymentAccount paymentAccount { get; set; }
        [DataMember]
        public TotalWeight totalWeight { get; set; }
        [DataMember]
        public TotalVolume totalVolume { get; set; }
        [DataMember]
        public AssessedWeight assessedWeight { get; set; }
        [DataMember]
        public AssessedVolume assessedVolume { get; set; }
        [DataMember]
        public List<SplitStatus> splitStatuses { get; set; }
        [DataMember]
        public List<ShipmentReference> shipmentReferences { get; set; }
        [DataMember]
        public List<AdditionalService> additionalService { get; set; }
        [DataMember]
        public List<Item> items { get; set; }
    }

    [DataContract]
    public class TrackingInformationResponse
    {
        [DataMember(Name = "compositeFault", IsRequired = false)]
        public CompositeFault compositeFault { get; set; }
        [DataMember]
        public List<Shipment> shipments { get; set; }
    }

    [DataContract]
    public class PostnordShipmentResponseDTO
    {
        [DataMember(Name = "TrackingInformationResponse", IsRequired = false)]
        public TrackingInformationResponse trackingInformationResponse { get; set; }
    }
}