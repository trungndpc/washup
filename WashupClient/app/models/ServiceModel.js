class ServiceModel {

    static isChecked(listServices, serviceId) {
        return listServices.findIndex(service => service["id"] === serviceId) >= 0;
    }

    static remove(listServices, serviceId) {
        listServices = listServices.filter((service) => service["id"] != serviceId);
        return listServices;
    }

    static isSelectOil(listServices) {
        let listOil = listServices.filter((service) => service.attachType == 2);
        return listOil.length > 0
    }

    static getOilService(listServices) {
        return listServices.filter((service) => service.attachType == 2);
    }

    static submitOil(listServices, oils) {
        let rs = [];
        listServices.forEach(service => {
            let tmpService = {...service};
            if (oils[tmpService.id]) {
                tmpService.oil = oils[tmpService.id];
            }
            rs.push(tmpService)
        });
        return rs;
    }

    static toStringListSelected(listServices) {
        console.log(listServices)
        let listName = listServices.map((service) => service.name);
        return listName.join(", ")
    }

    static getListServiceId(booking) {
        return booking.services.map(s => s.id);
    }

    static getListOil(booking) {
        let rs = [];
        booking.services.forEach(s => {
            if (s.oil) {
                rs.push(s.oil);
            }
        });
        return rs;
    }


}

export default ServiceModel;
