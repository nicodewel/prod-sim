import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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



    const models = useSelector(state => state.ressources.carModels)
    const lines = useSelector(state => state.productionlines.productionlines)

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
                        <th scope="col">Start/Stop/Statistik</th>
                    </tr>
                </thead>
                <tbody>
                    {lines?.map((pl, i) => <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{pl.name == null ? "Linienname" : pl.name}</td>
                        <td>
                            {console.log(pl.active)}
                           <select className="form-select" aria-label="Default select example" disabled={pl.active}>
                                {models.map(mod => <option value={mod.id}>{mod.name}</option>)}
                            </select>
                            {/* {pl.name == null ? "Fahrzeug" : pl.carModel.name} */}
                        </td>
                        <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
                        <td>{pl.active ? "läuft" : "läuft nicht"} </td>
                        <td><i className="bi bi-play iconhover" ></i><i className="bi bi-stop iconhover"></i><i class="bi bi-info-square iconhover"></i></td>
                    </tr>)}
                </tbody>
            </table>

            <NavLink to="/createproductionline"><button className="btn btn-primary m-1">Neue Produktionsstraße anlegen</button></NavLink>
            <NavLink to="/createstation"><button className="btn btn-primary m-1" >Neue Ressource anlegen</button></NavLink>


        </div>
    )

}

export default Landing;