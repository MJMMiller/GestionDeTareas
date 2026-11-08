## Compartir el frontend con Cloudflare

Se utilizó Cloudflare Tunnel para permitir el acceso al frontend desde otras computadoras mediante un enlace público HTTPS.

**01 - INSTALAR CLOUDFLARED**

En PowerShell, ejecutar:

```powershell
winget install --id Cloudflare.cloudflared
```

No se necesita una cuenta de Cloudflare.

**02 - INICIAR EL FRONTEND**

Desde la carpeta del proyecto:

```powershell
cd frontend
```

Luego ejecutar:

```powershell
npm run dev
```

**03 - INICIAR CLOUDFLARE**

En otra terminal de PowerShell, ejecutar:

```powershell
cloudflared tunnel --url http://localhost:3001
```

Si Windows no reconoce el comando:

```powershell
& "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:3001
```

Cloudflare genera un enlace público similar a:

```text
https://nombre-aleatorio.trycloudflare.com
```

Este enlace permite compartir y probar la aplicación desde otros dispositivos.

**Nota:** El enlace cambia al reiniciar el túnel. Para mantenerlo funcionando, ambas terminales deben permanecer abiertas. Se configuró `allowedHosts` en Vite para aceptar los dominios de Cloudflare sin tener que modificarlos cada vez.