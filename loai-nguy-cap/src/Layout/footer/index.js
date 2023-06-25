import "./styles.css"

const Footer=()=>{
    return(
        <footer>
            <div className="RelatedPage">
                <span>Trang liên quan</span>
                <div>
                    {arr.map((obj,index)=>{
                        return(
                            <RelatedPage key={index} img={obj.img}/>
                        )
                    })}
                </div>
            </div>
            <p style={{margin: 0}}>Copyright <i className="fa-solid fa-copyright"></i><i className="fa-solid fa-caret-down"></i> 2023 Mattech Corp</p>
        </footer>
    )
}
export default Footer

function RelatedPage(props){
    return(
        <a href="#" className="related-pageLink">
            <img src={props.img}></img>
        </a>
    )
}

const arr =[
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/worldBank.07de07b6.jpg"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/monre-logo.4371aa1b.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/logotc1.16cd79de.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/bnn-logo.42da3258.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/image-01-01.daf37fac.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/monre-logo.4371aa1b.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/plr.7337293c.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/Logo-Bioversity-92px-106px.26464286.png"
    },
    {
        img:"https://loainguycap.ceid.gov.vn/static/img/idlo-logo.37f0fb9e.png"
    }
]