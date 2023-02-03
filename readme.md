# Zum starten wie folgt vorgehen: 

# nur für die Verwendung unter Edge und Firefox freigegeben. 

Besuchen Sie: https://delightful-glacier-0c364b903.2.azurestaticapps.net

## MANUELLES STARTEN (Frontend und Backend)

!!! Hinweis: nur außerhalb des VW Netz möglich

1. Repository clonen
- git clone https://devstack.vwgroup.com/bitbucket/scm/fak73exam/g3_abschlusspruefung_jahr2_gruppe10.git

2. Ordner 'production-backend' in IntelliJ als Maven Projekt importieren und ConfiguratorBackendApplication starten

3.zum Ordner 'production-frontend' navigieren und folgenden Befehle ausführen:
 - npm install
 - REACT_APP_BACKEND_URL="http://localhost:8080/" npm start
