import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllEmployees, getAllStations } from "./production/ressourceSlice";
import { getAllRobots } from "./production/ressourceSlice";



const Landing = () => {


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllRobots());
        dispatch(getAllStations());
        dispatch(getAllEmployees())
    }, [])

    

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
                        <th scope="col">Status</th>
                        <th scope="col">Simulationsstatus</th>
                        <th scope="col">Start/Stop</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Golflinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                        <td><i class="bi bi-play"></i><i class="bi bi-stop"></i></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Tiguanlinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                        <td><i class="bi bi-play"></i><i class="bi bi-stop"></i></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Touranlinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                        <td><i class="bi bi-play"></i><i class="bi bi-stop"></i></td>
                    </tr>
                </tbody>
            </table>

            <NavLink to="/createproductionline"><button>Neue Produktionsstraße anlegen</button></NavLink>
            <NavLink to="/createstation"><button>Neue Ressource anlegen</button></NavLink>


        </div>
    )

}

export default Landing;