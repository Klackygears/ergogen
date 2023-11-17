// ceoloide:TRRS-PJ-320A-dual
//
// Normal footprint:
//     _________________
//    |   (B)   (C) (D)|
//    |                |
//    | (A)            |
//    |________________|
// 
// Reverse footprint:
//     _________________
//    |   (B)   (C) (D)|
//    | (A)            |
//    | (A)            |
//    |___(B)___(C)_(D)|
//
// Reverse & symmetric footprint:
//     _________________
//    | (A)   (C)   (D)|
//    |                |
//    |_(A)___(C)___(D)|
//
// Nets
//    A: corresponds to pin 1
//    B: corresponds to pin 2
//    C: corresponds to pin 3 (pin 2 symmetrical)
//    D: corresponds to pin 4 (pin 3 symmetrical)
// Params
//    reversible: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    symmetric: default is false
//      if true, will only work if reverse is also true
//      this will cause the footprint to be symmetrical on each half
//      pin B 1 and 2 must be identical if symmetric is true, as they will overlap

module.exports = {
  params: {
    designator: 'TRRS',
    symmetric: false,
    A: {type: 'net', value: 'A'},
    B: {type: 'net', value: 'B'},
    C: {type: 'net', value: 'C'},
    D: {type: 'net', value: 'D'},
    reversible: false,
    side: 'F',
  },
  body: p => {

    let footprint_name = "TRRS-PJ-320A-dual"
    if (p.reversible) {
      if (p.symmetric) {
        footprint_name += " (reversible, symmetric)"
      } else {
        footprint_name += " (reversible)"
      }
    }

    const standard_opening = `
      (module "ceoloide:${footprint_name}" (layer ${p.side}.Cu) (tedit 5970F8E5)

      ${p.at /* parametric position */}   

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 14.2) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.153))))
      (fp_text value TRRS-PJ-320A-dual (at 0 -5.6) (layer ${p.side}.Fab) (effects (font (size 1 1) (thickness 0.153))))

      ${''/* corner marks */}
      (fp_line (start 0.5 -2) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.1 0) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.5 0) (end 0.5 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.35 0) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end 0.75 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 12.1) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end -5.35 0) (layer Dwgs.User) (width 0.15))
      `
    function stabilizers(def_pos) {
      return `
        (pad "" np_thru_hole circle (at ${def_pos} 8.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at ${def_pos} 1.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
      `
    }
    function pins(def_neg, def_pos) {
      if(p.symmetric && p.reversible) {
        return `
          (pad 1 thru_hole oval (at ${def_pos} 10.75 ${p.rot}) (size 1.6 3.3) (drill oval 0.9 2.6) (layers *.Cu *.Mask) ${p.A.str})
          (pad 2 thru_hole oval (at ${def_pos} 6.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C.str})
          (pad 3 thru_hole oval (at ${def_pos} 3.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D.str})
        `
      } else {
        return `
          (pad 1 thru_hole oval (at ${def_neg} 11.3 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.A.str})
          (pad 2 thru_hole oval (at ${def_pos} 10.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.B.str})
          (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C.str})
          (pad 4 thru_hole oval (at ${def_pos} 3.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D.str})
        `
      }
    }
    if(p.reversible & p.symmetric) {
      return `
        ${standard_opening}
        ${stabilizers('-2.3')}
        ${pins('0', '-4.6')}
        ${pins('-4.6', '0')}
        )
      `
    } else if(p.reversible) {
        return `
          ${standard_opening}
          ${stabilizers('-2.3')}
          ${stabilizers('0')}
          ${pins('-2.3', '2.3')}
          ${pins('0', '-4.6')}
          )
        `
    } else {
      return `
        ${standard_opening}
        ${stabilizers('-2.3')}
        ${pins('-4.6', '0')}
        )
      `
    }
  }
}