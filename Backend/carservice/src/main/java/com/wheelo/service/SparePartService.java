package com.wheelo.service;

import com.wheelo.dto.SparePartDTO;
import com.wheelo.entities.SparePartDetails;

import java.util.List;

public interface SparePartService {
    String addSparePart(SparePartDTO newPart);

    String updatePart(long partId, SparePartDTO sparePartDTO);

    String deletePart(long partId);

    List<SparePartDetails> findAll();
}
