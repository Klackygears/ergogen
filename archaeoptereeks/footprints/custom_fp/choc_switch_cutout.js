module.exports = {
    params: {
        designator: 'CHOC',
        side: 'F',
        GND: {type: 'net', value: 'GND'},
        from: undefined,
        to: undefined
    },
    body: p => `
    (module choc_switch_cutout (layer F.Cu)
        ${p.at /* parametric position */}
        (attr virtual)
        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0.25 10.05) (layer "Eco2.User")  ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )

        ${'' /* pads */}
        (pad "1" smd roundrect (at 0 0 ${180 + p.rot}) (size 15.5 15.5) (layers "F.Cu" "F.Mask") (roundrect_rratio 0.063))
        (pad "1" smd roundrect (at 0 0 ${180 + p.rot}) (size 15.5 15.5) (layers "B.Cu" "B.Mask") (roundrect_rratio 0.063))
  
        ${'' /* switch cutout */}
        (fp_line (start -6.95 -6.95) (end 6.95 -6.95)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start -6.95 6.95) (end -6.95 -6.95)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start 6.95 -6.95) (end 6.95 6.95)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start 6.95 6.95) (end -6.95 6.95)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))

        ${'' /* keycap outlines */}
        (fp_line (start -8.75 -8.75) (end 8.75 -8.75)
          (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
        (fp_line (start -8.75 8.75) (end -8.75 -8.75)
          (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
        (fp_line (start 8.75 -8.75) (end 8.75 8.75)
          (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
        (fp_line (start 8.75 8.75) (end -8.75 8.75)
          (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))

  )
  
        `
}