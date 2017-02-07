import React from 'react'
import {render} from 'react-dom'
import App from './components/App.jsx'

render(<App names="[&quot;Tim&quot;,&quot;Matt&quot;,&quot;Janey&quot;,&quot;Elie&quot;]"/>,
       document.getElementById('main'));