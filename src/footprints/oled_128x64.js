module.exports = {
    params: {
      designator: 'OLED_128x64',
      side: 'F',
      VCC: {type: 'net', value: 'VCC'},
      GND: {type: 'net', value: 'GND'},
      SDA: undefined,
      SCL: undefined,
      show_outline: false,
      show_labels: false,
    },
    body: p => {
      const top = `
        (module SSD1306_128x64OLED (layer F.Cu) (tedit 6153EB9D)
          ${p.at /* parametric position */}

          ${'' /* footprint reference */}   
          (fp_text reference "${p.ref}" (at 0 -5.5 ${p.rot}) (layer "Dwgs.User") ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
          )
      `;
    
      const labels = `
      ${'' /* Silkscreen Labels  */}   
        (fp_text user "GND" (at 3.81 -3 ${p.rot}) (layer ${p.side}.silk)
        (effects (font (size 1 1) (thickness 0.15)) (justify left))
        `

      const front = `
          ${'' /* pins */}
          (pad 1 thru_hole rect (at 3.81 -1.53 ${90 + p.rot})  (size 2 1.6) (drill 1) (layers *.Cu *.Mask)${p.GND})
          (pad 2 thru_hole oval (at 1.27 -1.53 ${90 + p.rot})  (size 2 1.6) (drill 1) (layers *.Cu *.Mask)${p.VCC})
          (pad 3 thru_hole oval (at -1.27 -1.53 ${90 + p.rot}) (size 2 1.6) (drill 1) (layers *.Cu *.Mask)${p.SCL})
          (pad 4 thru_hole oval (at -3.81 -1.53 ${90 + p.rot}) (size 2 1.6) (drill 1) (layers *.Cu *.Mask)${p.SDA})
      `   
      
      const outline = `
          (fp_line (start 5 -0.2) (end 5 -2.8) (layer "Dwgs.User") (width 0.12))
          (fp_line (start -5 -0.2) (end -5 -2.8) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 13.35 -18.17) (end -13.35 -18.17) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 13.35 -4.27) (end -13.35 -4.27) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 13.65 0) (end 13.65 -27.8) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 8 -27.8) (end 8 -25) (layer "Dwgs.User") (width 0.12))
          (fp_line (start -8 -25) (end -8 -27.8) (layer "Dwgs.User") (width 0.12))
          (fp_line (start -5 -0.2) (end 5 -0.2) (layer "Dwgs.User") (width 0.12))
          (fp_line (start -13.65 0) (end 13.65 0) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 8 -25) (end -8 -25) (layer "Dwgs.User") (width 0.12))
          (fp_line (start 13.65 -27.8) (end -13.65 -27.8) (layer "Dwgs.User"))
          (fp_line (start -13.65 -27.8) (end -13.65 0) (layer "Dwgs.User"))
          (fp_line (start 5 -2.8) (end -5 -2.8) (layer "Dwgs.User") (width 0.12))
      `
      return `
      ${top}
      ${front}
      ${outline}
        )
    `

      final += front;

      return final;
    }
  }
  