
const endPoint = 'https://loainguycap.ceid.gov.vn/api/'
const Api = {
    loaicongbo : endPoint + 'loaicongbo',
    loaihientrangs : endPoint + 'loaihientrangs',
    provinces: endPoint + 'provinces',
    paginate: "paginate=true&page=1&perpage=15",
    sachDo: endPoint + "danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN",
    str :"https://loainguycap.ceid.gov.vn/api/loaicongbo?",
    permission:'http://wlp.howizbiz.com/api/roles',
    routerUser : 'http://wlp.howizbiz.com/api/users?',
    species:"http://wlp.howizbiz.com/api/species?"
    
}
export default Api