import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductionLine from "./production/ProductionLine";
import { getAllProductionlines } from "./production/productionlineSlice";
import { getAllComponents, getAllEmployees, getAllCarModels } from "./production/ressourceSlice";

const Landing = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllComponents());
        dispatch(getAllCarModels())
        dispatch(getAllEmployees())
        dispatch(getAllProductionlines())
    }, [])

    const status = useSelector(state => state.ressources.status)


    const lines = useSelector(state => state.productionlines.productionlines)

    const renderLoading = () => <div className="spinner-border position-absolute top-50 start-50" role="status"></div>;

    const renderDefault = () => {
        return (
            <div className="container-fluid">
                <h1>ProduktionsstraßenplanungsApp</h1>
                <table className="table caption-top">
                    <caption>Aktuelle Produktionsstraßen</caption>
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Produziert</th>
                            <th scope="col">Status</th>
                            <th scope="col">Simulationsstatus</th>
                            <th scope="col">Stückzahl</th>
                            <th  scope="col">Speed</th>
                            <th scope="col">Start/Stop/Statistik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines?.map((pl, key) => <ProductionLine key={key} number={key} pl={pl} />)}
                    </tbody>
                </table>

                <NavLink to="/createproductionline"><button className="btn btn-primary m-1">Neue Produktionsstraße anlegen</button></NavLink>
                <NavLink to="/createstation"><button className="btn btn-primary m-1" >Neue Ressource anlegen</button></NavLink>


            </div>
        )
    }

    return (status === "pending" ? renderLoading() : renderDefault());

}

export default Landing;