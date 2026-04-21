const { createClient } = require('@supabase-js/supabase-js');
const emailjs = require('@emailjs/browser');

exports.handler = async (event, context) => {
  // Solo permitir peticiones POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Inicializar Supabase usando las variables de entorno de Netlify
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    // 1. Insertar en Supabase
    const { error: sbError } = await supabase.from('inscripciones').insert([data]);
    if (sbError) throw sbError;

    // 2. Enviar Correos (Lógica de EmailJS)
    // Nota: Para usar EmailJS en servidor, se recomienda usar su API REST 
    // o la librería node. Aquí simulamos la llamada.
    // Por simplicidad, puedes mantener EmailJS en el frontend si la llave PUB es pública,
    // pero lo ideal es moverlo aquí.

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Registro exitoso" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
