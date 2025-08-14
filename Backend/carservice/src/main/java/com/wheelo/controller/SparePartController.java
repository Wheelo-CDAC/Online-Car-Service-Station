package com.wheelo.controller;

import com.wheelo.dto.SparePartDTO;
import com.wheelo.service.SparePartService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/spareparts")
@AllArgsConstructor
public class SparePartController {

    @Autowired
    SparePartService sparePartService;

    @GetMapping("/allparts")
    public ResponseEntity<?> getAllSpareParts(){
        return ResponseEntity.ok(sparePartService.findAll());
    }

    @PostMapping("/addpart")
    public ResponseEntity<?> addSparePart(@RequestBody SparePartDTO newPart){
        String msg = sparePartService.addSparePart(newPart);
        return ResponseEntity.ok(msg);
    }

    @PutMapping("/updatepart/{partId}")
    public ResponseEntity<?> updateSparePart(@RequestBody SparePartDTO sparePartDTO, @PathVariable long partId){
        String msg = sparePartService.updatePart(partId, sparePartDTO);
        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("/delete/{partId}")
    public ResponseEntity<?> deleteSparePart(@PathVariable long partId){
        String msg = sparePartService.deletePart(partId);
        return ResponseEntity.ok(msg);
    }
}
