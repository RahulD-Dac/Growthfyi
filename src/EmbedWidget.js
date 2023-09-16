
import React, { useState } from 'react';

function EmbedWidget() {
         const [url, setUrl] = useState('');
         const [result, setResult] = useState(null);

         const handleUrlChange = (event) => {
                  setUrl(event.target.value);
         };

         const handleSubmit = async (event) => {
                  event.preventDefault();

                  try {
                           const apiLogin = 'rahuldaradejio@gmail.com';
                           const apiPassword = 'c539c764af91f603';

                           const credentials = `${apiLogin}:${apiPassword}`;

                           const base64Credentials = btoa(credentials);

                           const tasks = [{ url }];

                         
                           const dataForSEOEndpoint = 'https://api.dataforseo.com/v3/on_page/instant_pages';

                           const response = await fetch(dataForSEOEndpoint, {
                                    method: 'POST',
                                    headers: {
                                             'Content-Type': 'application/json',
                                             'Authorization': `Basic ${base64Credentials}`,
                                    },
                                    body: JSON.stringify(tasks), 
                           });

                           if (response.ok) {
                                    const data = await response.json();
                                    setResult(data);
                           } else {
                                    console.error('API Error:', response.statusText);
                           }
                  } catch (error) {
                           console.error('Network Error:', error);
                  }
         };

         return (
                  <div>
                           <h2>Embeddable Widget</h2>
                           <form onSubmit={handleSubmit}>
                                    <label>
                                             EX=  https://api.dataforseo.com/v3/on_page/content_parsing/live
                                             Enter URL:

                                             
                                             <input
                                                      type="text"
                                                      value={url}
                                                      onChange={handleUrlChange}
                                             />
                                    </label>
                                    <button type="submit">Check</button>
                           </form>
                           {result && (
                                    <div>
                                             <h3>Result:</h3>
                                             <pre>{JSON.stringify(result, null, 2)}</pre>
                                    </div>
                           )}
                  </div>
         );
}

export default EmbedWidget;
