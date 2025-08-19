package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.dto.BomStyleResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.BomStyle;
import com.gsparvej.angularWithSpringBoot.entity.RawItems;
import com.gsparvej.angularWithSpringBoot.service.RawItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rawitems")
@CrossOrigin("*")
public class RawItemsRestController {

    @Autowired
    private RawItemsService itemsService;

    @GetMapping("")
    public List<RawItems> getAllItems() {
        return itemsService.getAllRawItems();
    }



    @PostMapping("")
    public ResponseEntity<RawItems> createItems(@RequestBody RawItems items) {
        RawItems savedItems = itemsService.saveItems(items);
        return ResponseEntity.ok(savedItems);
    }

}
