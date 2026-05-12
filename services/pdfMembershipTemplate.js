// ================= pdfTemplate.js =================
export const buildMembershipHTML = (data,logoBase64) => {
    const fullName = `${data.nombre} ${data.ape_pat} ${data.ape_mat}`;

    return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 12px;
        color: #1a1a1a;
        margin: 40px;
      }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 5px;
          padding: 10px;
        }
        
        .logo {
          width: 90px;
        }
        
        .title {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          color: #0b1f44;
        }

      .section {
        margin-bottom: 10px;
        border: 1px solid #e0e0e0;
        border-left: 3px solid #0b1f44;
        padding: 10px;
        border-radius: 6px;
      }

      .section-title {
        font-weight: bold;
        color: #0b1f44;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-size: 12px;
      }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .grid_four {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

      .field {
        width: 100%;
      }

      .label {
        font-weight: bold;
        margin-bottom: 6px;
        color: #555;
      }

      .value {
        margin-bottom: 5px;
      }

      .full {
        width: 100%;
      }

      .signature {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
      }

      .line {
        margin-top: 40px;
        margin-bottom: 5px;
        border-top: 1px solid #000;
        width: 280px;
        margin-left: auto;
        margin-right: auto;
      }

      .footer {
        margin-top: 30px;
        font-size: 10px;
        color: gray;
        text-align: justify;
      }

      .motto {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
        color: #0b1f44;
      }

    </style>
  </head>

  <body>

    <div class="header">
    
         <img class="logo" src="data:image/png;base64,${logoBase64}" />
               
         <div class="title">PENTATHLON DEPORTIVO MILITARIZADO UNIVERSITARIO <br>
            XXIV ZONA SAN LUIS POTOSI
         </div>
         
         <img class="logo" src="data:image/png;base64,${logoBase64}" />

    </div>

    <!-- ================= SECCIÓN GENERAL ================= -->
    <div class="section">
      <div class="section-title">Solicitud de Membresia Nacional ${new Date().getFullYear()} </div>
        
        <div class="field">
          <div class="label">Fecha de Registro</div>
          <div class="value">${data.fecha_registro}</div>
        </div>
      
      <div class="grid">
            
        <div class="field">
          <div class="label">Tipo Solicitud</div>
          <div class="value">${data.renovacion?.renovacion || "-"}</div>
        </div>
        
        <div class="field">
          <div class="label">Matrícula</div>
          <div class="value">${data.matricula || "-"}</div>
        </div>
        
        <div class="field">
          <div class="label">Reclutamiento</div>
          <div class="value">${data.reclutamiento || "-"}</div>
        </div>
        
      </div>
    </div>

    <!-- ================= PERSONALES ================= -->
    <div class="section">
      <div class="section-title">Datos Personales</div>

      <div class="grid">
              
        <div class="field">
          <div class="label">Nombre Completo</div>
          <div class="value">${fullName}</div>
        </div>

        <div class="field">
          <div class="label">Sexo</div>
          <div class="value">${data.genero?.genero}</div>
        </div>

        <div class="field">
          <div class="label">Fecha Nacimiento</div>
          <div class="value">${data.fecha_nacimiento}</div>
        </div>

        <div class="field">
          <div class="label">CURP</div>
          <div class="value">${data.curp}</div>
        </div>

        <div class="field">
          <div class="label">Domicilio</div>
          <div class="value">${data.domicilio}</div>
        </div>
        
        <div class="field">
          <div class="label">C&oacute;digo Postal</div>
          <div class="value">${data.codigo_postal}</div>
        </div>
        
        <div class="field">
          <div class="label">Municipio</div>
          <div class="value">${data.municipio?.municipio}</div>
        </div>
        
        <div class="field">
          <div class="label">Tel&eacute;fono</div>
          <div class="value">${data.telefono}</div>
        </div>
        
        <div class="field">
          <div class="label">Estado Civil</div>
          <div class="value">${data.estado_civil?.estado_civil}</div>
        </div>
        
        <div class="field">
          <div class="label">Ocupaci&oacute;n</div>
          <div class="value">${data.ocupacion?.ocupacion}</div>
        </div>
        
        <div class="field">
          <div class="label">Grado de Estudios</div>
          <div class="value">${data.grado_estudio?.grado_estudio}</div>
        </div>
        
      </div>
    </div>

    <!-- ================= MÉDICOS ================= -->
    <div class="section">
      <div class="section-title">Datos Médicos</div>

      <div class="grid">

        <div class="field">
          <div class="label">Tipo Sanguíneo</div>
          <div class="value">${data.tipo_sanguineo?.tipo_sanguineo}</div>
        </div>

        <div class="field full">
          <div class="label">Referencias M&eacute;dicas</div>
          <div class="value">${data.referencias_medicas}</div>
        </div>
      </div>
    </div>

    <!-- ================= INSTITUCIONAL ================= -->
    <div class="section">
      <div class="section-title">Datos Institucionales</div>

      <div class="grid">
      
        <div class="field">
          <div class="label">Fecha de Ingreso</div>
          <div class="value">${data.fecha_ingreso}</div>
        </div>
        
        <div class="field">
          <div class="label">Fecha de Jura de Bandera</div>
          <div class="value">${data.fecha_jura_bandera || "***"}</div>
        </div>
        
        <div class="field">
          <div class="label">Fecha de Jura Gui&oacute;n</div>
          <div class="value">${data.fecha_jura_guion || "***" }</div>
        </div>
        
        <div class="field">
          <div class="label">Zona</div>
          <div class="value">${data.zona?.zona}</div>
        </div>

        <div class="field">
          <div class="label">Subzona / Unidad</div>
          <div class="value">${data.subzona?.subzona}</div>
        </div>

        <div class="field">
          <div class="label">Cuerpo</div>
          <div class="value">${data.cuerpo?.cuerpo}</div>
        </div>
        
        <div class="field">
          <div class="label">Grado</div>
          <div class="value">${data.grado?.grado}</div>
        </div>


        <div class="field">
          <div class="label">Cargo</div>
          <div class="value">${data.cargo?.cargo}</div>
        </div>
                
      </div>
    </div>
    
    <div class="motto">
    <p>ATENTAMENTE</p>
      "PATRIA, HONOR Y FUERZA"
    </div>
    <!-- ================= FIRMA ================= -->
    <div class="signature">
        <div>
          <div class="line"></div>
            <div><b>${data.grado?.grado}</b></div>
            <div><b>${fullName}</b></div>
        </div>
        
        <div>
          <div class="line"></div>
            <div><b>Comandante de la XXIV Zona San Luis Potosí </b></div>
            <div><b>1er Comandante de Infantería</b></div>
            <div><b>Jos&eacute; Antonio Serna Herrejón</b></div>
        </div>

    </div>

    <div class="footer">
        Cualquier omisión o falsedad en la información que se signa será motivo de sanción o interrupci&oacute;n del tr&aacute;mite conforme al reglamento de afiliación institucional. 
        En caso de contar con algún grado o cargo dentro del P.D.M.U. la secci&oacute;n de Archivo y Detall del E.M.Z. cotejar&aacute; en expediente, y solicitar&aacute; copia al interesado
        de ser necesario. El trámite de la membres&iacute;a nacional inicia posterior a la firma de la solicitud, con el aval correspodiente del Comandante de Zona, Sub Zona, Unidad
        o Jefe de la Sección de Archivo según corresponda, la afiliación al P.D.M.U. es de carácter voluntario. A la firma, el interesado autoriza el uso de su imagen personal
        en propaganda institucional en los diversos medios digitales oficiales de la XXIV Zona San Luis Potos&iacute;
    </div>



  </body>
  </html>
  `;
};