Add-Type -AssemblyName System.Drawing
function New-EconIcon([int]$size, [string]$out) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#4A87C7'))
  $r = [int]($size * 0.22)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0,0,$r*2,$r*2,180,90); $path.AddArc($size-$r*2,0,$r*2,$r*2,270,90)
  $path.AddArc($size-$r*2,$size-$r*2,$r*2,$r*2,0,90); $path.AddArc(0,$size-$r*2,$r*2,$r*2,90,90)
  $path.CloseFigure()
  $g.FillPath($bg, $path)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), ([float]($size*0.055))
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  # axes
  $g.DrawLine($pen, $size*0.24, $size*0.22, $size*0.24, $size*0.78)
  $g.DrawLine($pen, $size*0.24, $size*0.78, $size*0.80, $size*0.78)
  # rising line chart
  $g.DrawLines($pen, @(
    (New-Object System.Drawing.PointF ($size*0.30), ($size*0.68)),
    (New-Object System.Drawing.PointF ($size*0.42), ($size*0.52)),
    (New-Object System.Drawing.PointF ($size*0.54), ($size*0.60)),
    (New-Object System.Drawing.PointF ($size*0.70), ($size*0.34))
  ))
  # bars
  $barBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220,255,255,255))
  $g.FillRectangle($barBrush, [float]($size*0.34), [float]($size*0.66), [float]($size*0.055), [float]($size*0.12))
  $g.FillRectangle($barBrush, [float]($size*0.47), [float]($size*0.60), [float]($size*0.055), [float]($size*0.18))
  $g.FillRectangle($barBrush, [float]($size*0.60), [float]($size*0.50), [float]($size*0.055), [float]($size*0.28))
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $bg.Dispose(); $pen.Dispose(); $barBrush.Dispose(); $path.Dispose()
}
New-EconIcon 512 'icon-512.png'
New-EconIcon 192 'icon-192.png'
New-EconIcon 180 'apple-touch-icon.png'
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path 'icon-512.png'))
$hicon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hicon)
$fs = [System.IO.File]::Create((Resolve-Path '.').Path + '\icon.ico')
$icon.Save($fs); $fs.Close(); $bmp.Dispose()
Get-ChildItem icon-192.png,icon-512.png,apple-touch-icon.png,icon.ico | Select-Object Name,Length
