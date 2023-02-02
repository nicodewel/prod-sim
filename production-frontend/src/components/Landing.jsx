import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductionLine from "./production/ProductionLine";
import { getAllProductionlines, getActiveSimulations } from "./production/productionlineSlice";
import { getAllComponents, getAllEmployees, getAllCarModels } from "./production/ressourceSlice";

const Landing = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllComponents());
        dispatch(getAllCarModels())
        dispatch(getAllEmployees())
        dispatch(getAllProductionlines())
        dispatch(getActiveSimulations());
        // eslint-disable-next-line
    }, [])


    const status = useSelector(state => state.ressources.status)
    const lines = useSelector(state => state.productionlines.productionlines)

    const renderLoading = () => <div className="spinner-border position-absolute top-50 start-50" role="status"></div>;

    const renderDefault = () => {
        return (
            <div className="container-fluid">
                <h1>ProduktionsstraßenplanungsApp</h1>
                <NavLink to="/createproductionline"><button className="btn btn-primary m-1">Neue Produktionsstraße anlegen</button></NavLink>
                <NavLink to="/createstation"><button className="btn btn-primary m-1" >Neue Ressource anlegen</button></NavLink>
                <div className="d-flex justify-content-between ">Aktuelle Produktionsstraßen <button className="btn btn-light m-1" ><i className="bi bi-arrow-clockwise"></i>
                    Aktualisieren</button></div>
                <table className="table caption-top">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Produziert</th>
                            <th scope="col">Status</th>
                            <th scope="col">Simulationsstatus</th>
                            <th scope="col">Stückzahl</th>
                            <th scope="col">Speed</th>
                            <th scope="col">Start/Stop</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines?.map((pl, key) => <ProductionLine key={key} number={key} pl={pl} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    return (status === "pending" ? renderLoading() : renderDefault());
}

export default Landing;