<h1>Documento resumen del proyecto para crear la aplicación "JobsFinder"</h1>

<ol>
<h2><li>Resumen del proyecto</li></h2>
<p>Esta aplicación servirá para publicar ofertas de trabajo por parte de las empresas y para que los usuarios puedan inscribirse a ellas. Los usuarios se podrán registrar como personas o empresas de manera que si se registra como persona se puede inscribir en una oferta de trabajo y si se registra como empresa puede publicar ofertas de trabajo. Cada usuario de la aplicacion, tanto empresa como persona, podrá añadir una descripción sobre él. Cuando se publique una oferta, se deben incluir detalles sobre ella y la empresa podrá ver las personas que se han inscrito a ella y contactar con ellos antes de cerrar la oferta. Los candidatos seleccionados recibiran una notificación de que han sido seleccionados. </p>
<h2><li>Aplicaciones similares</li></h2>
<p>Destacan dos aplicaciones similares en las que se basará este proyecto:</p>
<ul>
<li>Linkedin</li>
<li>Infojobs</li>
</ul>
<h2><li>Tecnologías utilizadas</li></h2>
<p>Las tecnologías utilizadas para el desarrollo de este proyecto son:</p>
<ul>
<li>Frontend: React</li>
<li>Backend: PHP</li>
<li>Base de datos: MySQL</li>
</ul>
<h2><li>Funcionalidad de la aplicación. Casos de uso</li></h2>
<p>A continuacion se expone el diagrama de casos de uso de la aplicación:</p>
<h2><li>Modelo de dominio</li></h2>
<p>A continuacion se expone el modelo de dominio de la aplicación:</p>
<h2><li>Diagrama de la base de datos</li></h2>
<p>A continuación se expone el diagrama de la base de datos de la aplicación:</p>
<h2><li>Estructura del backend</li></h2>
<p>La estructura del backend va a consistir en diferentes carpetas que funcionan a modo de DAO para cada clase. De esta manera en cada carpeta se encontraran los diferentes archivos PHP que realizaran en la base de datos MySQL la operacion solicitada. </p>
<p>A continuacion se explican los DAOs y las operaciones que contendran:</p>
<ul>


<li>usuarioDAO</li>
<ul>
<li>crearUsuario: para cuando un usuario se registre en la aplicacion.</li>
<li>editarUsuario: para editar los datos de un usuario.</li>
<li>obtenerUsuarioPorId: para buscar un usuario por el id.</li>
<li>obtenerUsuarios: para buscar todos los usuarios de la aplicacion.</li>
<li>identificacionUsuario: para identificar un usuario a partir de su username y password.</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>

<li>areaDAO</li>
<ul>
<li>obtenerAreas</li>
<li>obtenerAreaPorId</li>
</ul>



</ul>
<h2><li>Estructura del frontend</li></h2>
La aplicacion contará con las siguientes vistas:
<ul>
<li>Principal: esta vista funcionara como landing page y mostrará las principales caracteristicas de la aplicacion</li>
<li>Identificacion: esta vista contara con un formulario para que el usuario se identifique</li>
<li>Registro: esta vista contara con un formulario para que el usuario se registre</li>
<li>VistaUsuario: esta vista aparecera despues de que el usuario se identifique y contendra un resumen de sus datos</li>

<li>BuscadorOfertas: en esta vista el usuario podra realizar una busqueda para encontrar ofertas y aplicar filtros</li>
<li>OfertasGuardadas: en esta vista se mostraran las ofertas que haya guardado la persona</li>
<li>OfertasInscritas: en esta vista se mostraran las ofertas en las que se haya inscrito la persona</li>
<li>DetalleOferta: en esta vista, se podran ver los detalles de la oferta.</li>

<li>EditarPerfil: en esta vista el usuario podra editar los datos de su cuenta</li>
<li>BuscadorUsuarios: en esta vista el usuario podra realizar una busqueda para encontrar usuarios y aplicar filtros</li>
<li>DetalleUsuario: en esta vista, se podran ver los detalles de un usuario.</li>

<li>PublicarOferta: en esta vista la empresa podra publicar una oferta rellenando sus detalles en un formulario</li>
<li>OfertasPublicadas: en esta vista la empresa podra ver sus ofertas publicadas.</li>
<li>CerrarOferta: en esta vista, la empresa que creo la oferta la podra cerrar, viendo las personas que se han inscrito a ella</li>



La navegacion entre las diferentes vistas en la siguiente:

</ul>
<h2><li>Bocetos del frontend</li></h2>
<h2><li>Detalles de la aplicacion</li></h2>
<ul>
<li>Icono: JB como linkedin con fondo azul</li>
<li>Colores:
<ul>
<li>Azul oscuro:#4169E1</li>
<li>Azul claro:#87CEFA</li>
<li>Blanco:#FFFFFF</li>
</ul>
</li>
</ul>
<h2><li>Registro del tiempo</li></h2>
<p>El registro del tiempo es algo fundamental debido a la cantidad de tareas por realizar, además de este proyecto. Por lo tanto se definirá en la siguiente tabla la fecha, la hora de inicio, la hora final, el tiempo utilizado y una descripcion de cada tarea realizada y cada trabajo realizado en el proyecto. Ademas este registro del tiempo sirve para estimar el tiempo de realizacion para trabajos futuros y para controlar que el esfuerzo en este proyecto no exceda los limites aceptables. </p>
<table>
<tr>
    <th>Fecha</th>
    <th>Hora de inicio</th>
    <th>Hora final</th>
    <th>Tiempo utilizado (en minutos)</th>
    <th>Descripción del trabajo realizado</th>
  </tr>
  <tr>
    <td>Viernes 7 de abril de 2023</td>
    <td>21:20</td>
    <td>22:00</td>
    <td>40</td>
    <td>Realizar primeras partes documento resumen</td>
  </tr>
  <tr>
    <td>Viernes 7 de abril de 2023</td>
    <td>22:55</td>
    <td>23:05</td>
    <td>10</td>
    <td>Realizar diagramas astah</td>
  </tr>
  <tr>
    <td>Lunes 10 de abril de 2023</td>
    <td>21:10</td>
    <td>21:30</td>
    <td>20</td>
    <td>Realizar diagramas astah</td>
  </tr>
  <tr>
    <td>Lunes 10 de abril de 2023</td>
    <td>22:25</td>
    <td>0:00</td>
    <td>95</td>
    <td>Realizar diagramas astah y comenzar bocetos</td>
  </tr>
  <tr>
    <td>Martes 11 de abril de 2023</td>
    <td>9:00</td>
    <td>9:15</td>
    <td>15</td>
    <td>Realizar diagramas astah</td>
  </tr>

  <tr>
    <td>Martes 11 de abril de 2023</td>
    <td>13:30</td>
    <td>14:30</td>
    <td>60</td>
    <td>Script base datos y diagrama base de datos</td>
  </tr>

  <tr>
    <td>Jueves 13 de abril de 2023</td>
    <td>9:10</td>
    <td>10:05</td>
    <td>55</td>
    <td>Parte backend PHP</td>
  </tr>

   <tr>
    <td>Jueves 13 de abril de 2023</td>
    <td>19:15</td>
    <td>20:30</td>
    <td>55</td>
    <td>Bocetos</td>
  </tr>

  <tr>
    <td>Viernes 14 de abril de 2023</td>
    <td>9:00</td>
    <td>9:30</td>
    <td>30</td>
    <td>Parte DAOS PHP</td>
  </tr>

  <tr>
    <td>Viernes 14 de abril de 2023</td>
    <td>17:00</td>
    <td>18:35</td>
    <td>95</td>
    <td>Primeras interfaces React</td>
  </tr>

  <tr>
    <td>Viernes 14 de abril de 2023</td>
    <td>18:55</td>
    <td>21:45</td>
    <td>170</td>
    <td>Primeras interfaces React</td>
  </tr>
  
</table>
<h2><li>Organización del proyecto: tablero y metodología</li></h2>
<h2><li>Resultado final: vídeo youtube y repositorio</li></h2>

</ol>