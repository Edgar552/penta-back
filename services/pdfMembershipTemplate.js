import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 9,
        fontFamily: "Helvetica",
        color: "#1a1a1a"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    logo: {
        width: "13%",
       // height: 70
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 11,
        fontWeight: "bold",
        color: "#0b1f44"
    },
    section: {
        borderRadius:6,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderLeftWidth: 3,
        borderLeftColor: "#0b1f44",
        padding: 5,
        marginBottom: 5
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#0b1f44",
        marginBottom: 6
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    field: {
        width: "33%",
        marginBottom: 10,
        paddingRight: 10
    },
    fullField: {
        width: "100%",
        marginBottom: 8
    },
    label: {
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5
    },
    value: {
        fontSize: 9
    },
    motto: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: "bold",
        color: "#0b1f44"
    },
    signatureContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40
    },
    signatureBlock: {
        width: "45%",
        textAlign: "center",
        fontWeight: "bold",

    },
    signatureLine: {
        borderTopWidth: 1,
        borderTopColor: "#000",
        marginBottom: 5
    },
    footer: {
        marginTop: 20,
        fontSize: 8,
        textAlign: "justify",
        color: "gray"
    }
});

const Field = ({ label, value, full = false }) => {
    return React.createElement(
        View,
        {
            style: full ? styles.fullField : styles.field
        },
        React.createElement(
            Text,
            { style: styles.label },
            label
        ),
        React.createElement(
            Text,
            { style: styles.value },
            value || "-"
        )
    );
};

export const MembershipPDFTemplate = ({ data, logo }) => {
    const fullName = `${data.nombre || ""} ${data.ape_pat || ""} ${data.ape_mat || ""}`;
    const fullAddress = `${data.domicilio || ""}, ${data.municipio?.municipio || ""}, S.L.P. C.P. ${data.codigo_postal || ""}`;

    return React.createElement(
        Document,
        null,

        React.createElement(
            Page,
            {
                size: "Letter",
                style: styles.page
            },

            // HEADER
            React.createElement(
                View,
                { style: styles.header },

                React.createElement(Image, {
                    src: logo,
                    style: styles.logo
                }),

                React.createElement(
                    Text,
                    { style: styles.title },
                    "PENTATHLON DEPORTIVO MILITARIZADO UNIVERSITARIO\nXXIV ZONA SAN LUIS POTOSI"
                ),

                React.createElement(Image, {
                    src: logo,
                    style: styles.logo
                })
            ),

            // SOLICITUD
            React.createElement(
                View,
                { style: styles.section },

                React.createElement(
                    Text,
                    { style: styles.sectionTitle },
                    `Solicitud de Membresía Nacional ${new Date().getFullYear()}`
                ),

                React.createElement(
                    View,
                    { style: styles.row },

                    React.createElement(Field, {
                        label: "Fecha Registro",
                        value: data.fecha_registro,
                        full: true
                    }),

                    React.createElement(Field, {
                        label: "Tipo Solicitud",
                        value: data.renovacion?.renovacion
                    }),

                    React.createElement(Field, {
                        label: "Matrícula",
                        value: data.matricula
                    }),

                    React.createElement(Field, {
                        label: "Reclutamiento",
                        value: data.reclutamiento
                    })
                )
            ),

            // PERSONALES
            React.createElement(
                View,
                { style: styles.section },

                React.createElement(
                    Text,
                    { style: styles.sectionTitle },
                    "Datos Personales"
                ),

                React.createElement(
                    View,
                    { style: styles.row },

                    React.createElement(Field, {
                        label: "Nombre Completo",
                        value: fullName
                    }),

                    React.createElement(Field, {
                        label: "Sexo",
                        value: data.genero?.genero
                    }),

                    React.createElement(Field, {
                        label: "Fecha de Nacimiento",
                        value: data.fecha_nacimiento
                    }),

                    React.createElement(Field, {
                        label: "Estado Civil",
                        value: data.estado_civil?.estado_civil
                    }),

                    React.createElement(Field, {
                        label: "Lugar de Nacimiento",
                        value: data.lugar_nacimiento?.lugar_nacimiento,
                    }),

                    React.createElement(Field, {
                        label: "CURP",
                        value: data.curp
                    }),

                    React.createElement(Field, {
                        label: "Domicilio Completo",
                        value: fullAddress,
                        full:true

                    }),

                    React.createElement(Field, {
                        label: "Teléfono",
                        value: data.telefono
                    }),

                    React.createElement(Field, {
                        label: "Grado de Estudio",
                        value: data.grado_estudio?.grado_estudio
                    }),

                    React.createElement(Field, {
                        label: "Ocupación",
                        value: data.ocupacion?.ocupacion
                    })
                )
            ),

            // MÉDICOS
            React.createElement(
                View,
                { style: styles.section },

                React.createElement(
                    Text,
                    { style: styles.sectionTitle },
                    "Datos Médicos"
                ),

                React.createElement(
                    View,
                    { style: styles.row },

                    React.createElement(Field, {
                        label: "Tipo Sanguíneo",
                        value: data.tipo_sanguineo?.tipo_sanguineo
                    }),

                    React.createElement(Field, {
                        label: "Referencias Médicas",
                        value: data.referencias_medicas,

                    })
                )
            ),

            // INSTITUCIONAL
            React.createElement(
                View,
                { style: styles.section },

                React.createElement(
                    Text,
                    { style: styles.sectionTitle },
                    "Datos Institucionales"
                ),

                React.createElement(
                    View,
                    { style: styles.row },

                    React.createElement(Field, {
                        label: "Fecha Ingreso",
                        value: data.fecha_ingreso
                    }),

                    React.createElement(Field, {
                        label: "Fecha Jura Bandera",
                        value: data.fecha_jura_bandera
                    }),

                    React.createElement(Field, {
                        label: "Fecha Jura Guion",
                        value: data.fecha_jura_guion
                    }),

                    React.createElement(Field, {
                        label: "Zona",
                        value: data.zona?.zona
                    }),

                    React.createElement(Field, {
                        label: "Subzona / Unidad",
                        value: data.subzona?.subzona
                    }),

                    React.createElement(Field, {
                        label: "Cuerpo",
                        value: data.cuerpo?.cuerpo
                    }),

                    React.createElement(Field, {
                        label: "Grado",
                        value: data.grado?.grado
                    }),

                    React.createElement(Field, {
                        label: "Cargo",
                        value: data.cargo?.cargo
                    })
                )
            ),

            // MOTTO
            React.createElement(
                Text,
                { style: styles.motto },
                'ATENTAMENTE\n"PATRIA, HONOR Y FUERZA"'
            ),

            // FIRMAS
            React.createElement(
                View,
                { style: styles.signatureContainer },

                React.createElement(
                    View,
                    { style: styles.signatureBlock },

                    React.createElement(View, {
                        style: styles.signatureLine
                    }),

                    React.createElement(
                        Text,
                        null,
                        data.grado?.grado || ""
                    ),

                    React.createElement(
                        Text,
                        null,
                        fullName
                    )
                ),

                React.createElement(
                    View,
                    { style: styles.signatureBlock },

                    React.createElement(View, {
                        style: styles.signatureLine
                    }),

                    React.createElement(
                        Text,
                        null,
                        "Comandante de la XXIV Zona"
                    ),

                    React.createElement(
                        Text,
                        null,
                        "1er Comandante de Infantería"
                    ),

                    React.createElement(
                        Text,
                        null,
                        "José Antonio Serna Herrejón"
                    )
                )
            ),

            // FOOTER
            React.createElement(
                Text,
                { style: styles.footer },
                "Cualquier omisión o falsedad en la información que se signa será motivo de sanción o interrupción del tramite conforme al reglamento de afiliación institucional." +
                "En caso de contar con algún grado o cargo dentro del P.D.M.U. la sección de Archivo y Detall del E.M.Z. cotejará; en expediente, y solicitará copia al interesado " +
                "de ser necesario. El trámite de la membresia nacional inicia posterior a la firma de la solicitud, con el aval correspodiente del Comandante de Zona, Sub Zona, Unidad " +
                "o Jefe de la Sección de Archivo según corresponda, la afiliación al P.D.M.U. es de carácter voluntario. A la firma, el interesado autoriza el uso de su imagen personal " +
                "en propaganda institucional en los diversos medios digitales oficiales de la XXIV Zona San Luis Potosi"
            )
        )
    );
};