// EC11 rotary encoder
//
// Nets
//    from: corresponds to switch pin 1 (for button presses)
//    to: corresponds to switch pin 2 (for button presses)
//    A: corresponds to pin 1 (for rotary)
//    B: corresponds to pin 2 (for rotary, should be GND)
//    C: corresponds to pin 3 (for rotary)

module.exports = {
    params: {
        class: 'ROT',
        // By placing a model in the path specified below KiCad will show it in the 3D viewer
        from: undefined,
        to: undefined,
        A: undefined,
        B: undefined,
        C: undefined
    },
    body: p => `
        (module rotary_encoder (layer F.Cu) (tedit 603326DE)

            ${p.at /* parametric position */}
        
            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0.5) (layer F.SilkS) 
                ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
            (fp_text value "" (at 0 8.89) (layer F.Fab)
                (effects (font (size 1 1) (thickness 0.15))))

            ${''/* component outline */}
            (fp_line (start -3.12 -0.04) (end 2.88 -0.04) (layer F.Fab) (width 0.12))
            (fp_line (start -0.12 -3.04) (end -0.12 2.96) (layer F.Fab) (width 0.12))
            (fp_line (start -6.12 -4.74) (end -5.12 -5.84) (layer F.Fab) (width 0.12))
            (fp_line (start -6.12 5.76) (end -6.12 -4.74) (layer F.Fab) (width 0.12))
            (fp_line (start 5.88 5.76) (end -6.12 5.76) (layer F.Fab) (width 0.12))
            (fp_line (start 5.88 -5.84) (end 5.88 5.76) (layer F.Fab) (width 0.12))
            (fp_line (start -5.12 -5.84) (end 5.88 -5.84) (layer F.Fab) (width 0.12))
            (fp_line (start -8.87 -6.89) (end 7.88 -6.89) (layer F.CrtYd) (width 0.05))
            (fp_line (start -8.87 -6.89) (end -8.87 6.81) (layer F.CrtYd) (width 0.05))
            (fp_line (start 7.88 6.81) (end 7.88 -6.89) (layer F.CrtYd) (width 0.05))
            (fp_line (start 7.88 6.81) (end -8.87 6.81) (layer F.CrtYd) (width 0.05))
            (fp_circle (center -0.12 -0.04) (end 2.88 -0.04) (layer F.Fab) (width 0.12))

            ${''/* pin names */}
            (pad A thru_hole rect (at -7.62 -2.54 ${p.rot}) (size 2 2) (drill 1) (layers *.Cu *.Mask) ${p.A.str})
            (pad C thru_hole circle (at -7.62 -0.04) (size 2 2) (drill 1) (layers *.Cu *.Mask) ${p.C.str})
            (pad B thru_hole circle (at -7.62 2.46) (size 2 2) (drill 1) (layers *.Cu *.Mask) ${p.B.str})
            (pad 1 thru_hole circle (at 6.88 -2.54) (size 1.5 1.5) (drill 1) (layers *.Cu *.Mask) ${p.from.str})
            (pad 2 thru_hole circle (at 6.88 2.46) (size 1.5 1.5) (drill 1) (layers *.Cu *.Mask) ${p.to.str})

            ${''/* Legs */}
            (pad "" thru_hole rect (at -0.12 -5.64 ${p.rot}) (size 3.2 2) (drill oval 2.8 1.5) (layers *.Cu *.Mask))
            (pad "" thru_hole rect (at -0.12 5.56 ${p.rot}) (size 3.2 2) (drill oval 2.8 1.5) (layers *.Cu *.Mask))
        
        )
    `
}
