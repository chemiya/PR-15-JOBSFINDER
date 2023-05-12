<?php

function switchArea($val) {
    $idArea=0;
    switch($val){
        case "Fullstack":
            $idArea=1;
            break;
        case "Backend":
            $idArea=2;
            break;
        case "Frontend":
            $idArea=3;
            break;
        case "Data Science":
            $idArea=4;
            break;
        case "Machine Learning":
            $idArea=5;
            break;
        case "Devops":
            $idArea=6;
            break;
        case "Cybersecurity":
            $idArea=7;
            break;
        case "Testing":
            $idArea=8;
            break;
        case "Network":
            $idArea=9;
            break;
        case "Databases":
            $idArea=10;
            break;
        case "Operating Systems":
            $idArea=11;
            break;
        case "Videogames":
            $idArea=12;
            break;
        case "Mobile Development":
            $idArea=13;
            break;
        default:
            $idArea=14;
            break;
        }

        return $idArea;
}
?>