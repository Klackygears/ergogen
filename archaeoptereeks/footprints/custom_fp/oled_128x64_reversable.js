// Author: @infused-kim
//
// Description:
// Reversible footprint for nice!view display. Includes an outline of the
// display to make positioning easier.

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reverse: false,
    SDA: {type: 'net', value: 'SDA'},
    SCL: {type: 'net', value: 'SCL'},
    VCC: {type: 'net', value: 'VCC'},
    GND: {type: 'net', value: 'GND'},
    show_labels: {type: 'boolean', value: true},
    jumpers_at_bottom: false,
  },
  body: p => {

    let dst_nets = [
      p.SDA.str,
      p.SCL.str,
      p.VCC.str,
      p.GND.str,
    ];
    local_nets = [
      p.local_net("1").str,
      p.local_net("2").str,
      p.VCC.str,
      p.local_net("4").str,
    ];

    let socket_nets = dst_nets;
    if(p.reverse) {
      socket_nets = local_nets;
    } else if(p.side == 'B') {
      socket_nets = dst_nets.slice().reverse();
    }

    let jumpers_offset = 0;
    let jumpers_rot = 0;
    let labels_offset = 0;
    let label_vcc_offset = 0;

    let jumpers_front_top = dst_nets;
    let jumpers_front_bottom = local_nets;
    let jumpers_back_top = dst_nets;
    let jumpers_back_bottom = local_nets.slice().reverse();
    if(p.jumpers_at_bottom) {
      jumpers_offset = 5.7;
      jumpers_rot = 180;
      labels_offset = jumpers_offset + 2 + 1 + 0.1;
      label_vcc_offset = 4.85;

      jumpers_front_top = local_nets;
      jumpers_front_bottom = dst_nets;
      jumpers_back_top = local_nets.slice().reverse();
      jumpers_back_bottom = dst_nets;
    }

    const top = `
      (module nice!view (layer F.Cu) (tedit 6448AF5B)
        ${p.at /* parametric position */}
        (attr virtual)
        (fp_text reference "${p.ref}" (at 0 20 ${p.rot}) (layer ${p.side}.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
        `
    const front = `
        (fp_line (start -14 -14) (end 14 -14) (layer Dwgs.User) (width 0.15))
        (fp_line (start 14 14) (end -14 14) (layer Dwgs.User) (width 0.15))
        (fp_line (start -14 14) (end -14 -14) (layer Dwgs.User) (width 0.15))
        (fp_line (start 14 14) (end 14 -14) (layer Dwgs.User) (width 0.15))
        (fp_line (start 13.5 -7.5) (end 13.5 7.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -13.5 -7.5) (end -13.5 7.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 13.5 7.5) (end -13.5 7.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -13.5 -7.5) (end 13.5 -7.5) (layer Dwgs.User) (width 0.15))
        (fp_text user %R (at 0 2 ${p.rot}) (layer F.Fab)
          (effects (font (size 1 1) (thickness 0.15)))
        )

    `

    const front_jumpers = `
        (pad 14 smd rect (at -3.81 ${9.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_top[0] })
        (pad 15 smd rect (at -1.27 ${9.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_top[1] })
        (pad 17 smd rect (at 1.27 ${9.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_top[2] })
        (pad 16 smd rect (at 3.81 ${9.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_top[3] })

        (pad 10 smd rect (at -3.81 ${10.85 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_bottom[0] })
        (pad 11 smd rect (at -1.27 ${10.85 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_bottom[1] })
        (pad 13 smd rect (at 1.27 ${10.85 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_bottom[2] })
        (pad 12 smd rect (at 3.81 ${10.85 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${ jumpers_front_bottom[3] })
    `

    const back = `
    `

    const back_jumpers = `
        (pad 24 smd rect (at 3.81 ${9.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_top[0] })
        (pad 25 smd rect (at 1.27 ${9.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_top[1] })
        (pad 27 smd rect (at -1.27 ${9.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_top[2] })
        (pad 26 smd rect (at -3.81 ${9.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_top[3] })

        (pad 20 smd rect (at 3.81 ${10.85 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_bottom[0] })
        (pad 21 smd rect (at 1.27 ${10.85 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_bottom[1] })
        (pad 23 smd rect (at -1.27 ${10.85 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_bottom[2] })
        (pad 22 smd rect (at -3.81 ${10.85 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${ jumpers_back_bottom[3] })
    `

    const labels = `
        (fp_text user SDA (at -3.81 ${8.5 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)))
        )
        (fp_text user GND (at 3.81 ${8.5 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)))
        )
        (fp_text user VCC (at 1.27 ${8.5 + label_vcc_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)))
        )
        (fp_text user SCL (at -1.27 ${8.5 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)))
        )
        (fp_text user VCC (at -1.27 ${8.5 + label_vcc_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)) (justify mirror))
        )
        (fp_text user SDA (at 3.81 ${8.5 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)) (justify mirror))
        )
        (fp_text user SCL (at 1.27 ${8.5 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)) (justify mirror))
        )
        (fp_text user GND (at -3.81 ${8.5 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 0.7) (thickness 0.1)) (justify mirror))
        )
    `

    const bottom = `
      (pad 1 thru_hole oval (at -3.81 13.2 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${ socket_nets[0] })
      (pad 2 thru_hole oval (at -1.27 13.2 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${ socket_nets[1] })
      (pad 3 thru_hole oval (at 1.27 13.2 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${ socket_nets[2] })
      (pad 4 thru_hole oval (at 3.81 13.2 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${ socket_nets[3] })
    )
    `

    let final = top;

    if(p.side == "F" || p.reverse) {
      final += front;
    }
    if(p.side == "B" || p.reverse) {
      final += back;
    }

    if(p.reverse) {
      final += front_jumpers;
      final += back_jumpers;

      if(p.show_labels) {
        final += labels;
      }
    }

    final += bottom;

    return final;
  }
}