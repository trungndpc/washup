class PriceUtils {

    static toThousand(price) {
        let k = (price / 1000) 
        return k.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + "K"
    }

    format(price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + "K"
    }
}

export default PriceUtils;
