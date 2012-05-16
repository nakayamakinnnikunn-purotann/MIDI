// Generated by CoffeeScript 1.3.1
(function() {
  var NoteRain,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  NoteRain = (function() {

    NoteRain.name = 'NoteRain';

    NoteRain.prototype.noteScale = 0.001;

    function NoteRain(_arg) {
      var blackKeyWidth, currentTime, duration, event, geometry, interval, keyInfo, length, material, mesh, midiData, noteNumber, notes, pianoDesign, startTime, subtype, x, y, z, _i, _len, _ref, _ref1;
      midiData = _arg.midiData, pianoDesign = _arg.pianoDesign;
      this.update = __bind(this.update, this);

      blackKeyWidth = pianoDesign.blackKeyWidth, keyInfo = pianoDesign.keyInfo;
      this.model = new THREE.Object3D();
      notes = [];
      currentTime = 0;
      for (_i = 0, _len = midiData.length; _i < _len; _i++) {
        _ref = midiData[_i], (_ref1 = _ref[0], event = _ref1.event), interval = _ref[1];
        currentTime += interval;
        subtype = event.subtype, noteNumber = event.noteNumber;
        if (subtype === 'noteOn') {
          notes[noteNumber] = currentTime;
        } else if (subtype === 'noteOff') {
          startTime = notes[noteNumber];
          duration = currentTime - startTime;
          length = duration * this.noteScale;
          x = keyInfo[noteNumber].keyCenterPosX;
          y = startTime * this.noteScale + (length / 2);
          z = -0.3;
          geometry = new THREE.CubeGeometry(blackKeyWidth, length, blackKeyWidth);
          material = new THREE.MeshLambertMaterial({
            color: 0x00f0f0
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, y, z);
          this.model.add(mesh);
        }
      }
    }

    NoteRain.prototype.update = function(playerCurrentTime) {
      return this.model.position.y = -playerCurrentTime * this.noteScale;
    };

    return NoteRain;

  })();

  this.NoteRain = NoteRain;

}).call(this);