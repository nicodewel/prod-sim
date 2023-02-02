import vwlogo from "../favicon.ico"



const Header = ({ headline, btnArr }) => {
    return (
        <div className="d-flex justify-content-between vw-border-bottom mt-3 mb-3 pb-3" >
            <div className="">
                <h1 className="ms-2 mb-3">{headline}</h1>
                {btnArr?.map(btn => btn)}
            </div>
            <div className="align-middle">
                <img src={vwlogo} width={100} height={100} alt="LOGO" />
            </div>
        </div>
    )
}

export default Header;