const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Initialize Supabase using Environment Variables from Netlify Panel
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    // Insert data into the 'inscripciones' table
    const { error: sbError } = await supabase.from('inscripciones').insert([data]);
    
    if (sbError) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: sbError.message }) 
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Registration successful" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
