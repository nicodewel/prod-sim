import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductionLine from "./production/ProductionLine";
import { getAllProductionlines, getActiveSimulations } from "./production/productionlineSlice";
import { getAllComponents, getAllEmployees, getAllCarModels } from "./production/ressourceSlice";
import Header from "./Header";
import { useRef } from "react";

const Landing = () => {

    const dispatch = useDispatch();
    const interval = useRef();


    useEffect(() => {
        document.title = "Prod Simulation"
        dispatch(getAllComponents());
        dispatch(getAllCarModels())
        dispatch(getAllEmployees())
        dispatch(getAllProductionlines())
        dispatch(getActiveSimulations());
        // eslint-disable-next-line
    }, [])

    const toggleRefresh = () => {
        if (!interval.current) {
            interval.current = setInterval(() => dispatch(getActiveSimulations()), 2000);
        } else {
            clearInterval(interval.current)
            interval.current = null;
        }
    }

    const status = useSelector(state => state.ressources.status)
    const lines = useSelector(state => state.productionlines.productionlines)

    const renderLoading = () => <div className="spinner-border position-absolute top-50 start-50" role="status"></div>;

    const createPlBtn = <NavLink to="/createproductionline"><button className="vw-btn m-1">Neue Produktionsstraße anlegen</button></NavLink>;
    const createResBtn = <NavLink to="/createstation"><button className="vw-btn m-1" >Neue Ressource anlegen</button></NavLink>;
    const headBtns = [createPlBtn, createResBtn];


    const mainHeadline = "Production Simulator"


    const renderDefault = () => {
        return (
            <div className="container-fluid">
                <Header headline={mainHeadline} btnArr={headBtns} />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Aktuelle Produktionsstraßen</h3>
                    <div>
                        <div>
                            <button id="toggleRefresh" className="vw-btn m-1" onClick={() => dispatch(getActiveSimulations())}>
                                <i className="bi bi-arrow-clockwise" />Aktualisieren
                            </button>
                        </div>

                        <div className="form-check form-switch ms-2">
                            <input className="form-check-input vw-checkbox" type="checkbox" id="flexSwitchCheckDefault" onChange={() => toggleRefresh()} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ "font-size": "0.8em" }}>AutoRefresh</label>
                        </div>
                    </div>

                </div>

                <table className="table caption-top ">
                    <thead className="table-light vw-blue">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Produziert</th>
                            <th scope="col">Status</th>
                            <th scope="col">Simulationsstatus</th>
                            <th scope="col">Stückzahl</th>
                            <th scope="col">Speed</th>
                            <th scope="col">Start </th>
                            <th className="text-center" scope="col">Stop</th>
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