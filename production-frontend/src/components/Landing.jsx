import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProductionlines } from "./production/productionlineSlice";
import { getAllComponents, getAllEmployees, getAllStations } from "./production/ressourceSlice";
import { getAllRobots } from "./production/ressourceSlice";



const Landing = () => {


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllComponents());
        dispatch(getAllEmployees())
        dispatch(getAllProductionlines())
    }, [])

    const lines = useSelector(state => state.productionlines.productionlines)

    return (
        <div>
            <h1>ProduktionsstraßenplanungsApp</h1>
            <h2>Übersicht</h2>
            <table className="table caption-top">
                <caption>Aktuelle Produktionsstraßen</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Produziert</th>
                        <th scope="col">Status</th>
                        <th scope="col">Simulationsstatus</th>
                        <th scope="col">Start/Stop/Bearbeiten</th>
                    </tr>
                </thead>
                <tbody>
                {lines?.map((pl, i) => <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{pl.name == null ? "Linienname" : pl.name}</td>
                        <td>{pl.name == null ? "Fahrzeug" : pl.carModel.name}</td>
                        <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
                        <td>{pl.active ? "läuft" : "läuft nicht"} </td>
                        <td><i className="bi bi-play iconhover"></i><i className="bi bi-stop iconhover"><i className="bi bi-pencil-square iconhover" onClick={() => console.log("ICH BIN BEARBIOETN")}></i></i></td>
                    </tr>)}
                </tbody>
            </table>

            <NavLink to="/createproductionline"><button>Neue Produktionsstraße anlegen</button></NavLink>
            <NavLink to="/createstation"><button>Neue Ressource anlegen</button></NavLink>


        </div>
    )

}

export default Landing;