package com.wheelo.service;

import com.wheelo.dao.SparePartDao;
import com.wheelo.dto.SparePartDTO;
import com.wheelo.entities.SparePartDetails;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class SparePartServiceImpl implements SparePartService{

    @Autowired
    private SparePartDao sparePartDao;


    @Override
    public String addSparePart(SparePartDTO newPart) {
        SparePartDetails sparePartDetails = new SparePartDetails();

        sparePartDetails.setPartName(newPart.getPartName());
        sparePartDetails.setPrice(newPart.getPrice());
        sparePartDetails.setQuantity(newPart.getQuantity());

        sparePartDao.save(sparePartDetails);
        return "Added new part";
    }

    @Override
    public String updatePart(long partId, SparePartDTO sparePartDTO) {

        Optional<SparePartDetails> existingOptional = sparePartDao.findById(partId);
        if(!existingOptional.isPresent())
            throw new RuntimeException("Spare part with ID " + partId + " not found.");

        SparePartDetails existingPart = existingOptional.get();

        existingPart.setPartName(sparePartDTO.getPartName());
        existingPart.setQuantity(sparePartDTO.getQuantity());
        existingPart.setPrice(sparePartDTO.getPrice());

        sparePartDao.save(existingPart);

        return "Updated the spare part";
    }

    @Override
    public String deletePart(long partId) {
        if(!sparePartDao.existsById(partId))
            throw new RuntimeException("Spare part with ID " + partId + " not found.");
        sparePartDao.deleteById(partId);

        return "Deleted spare part with id " + partId;
    }

    @Override
    public List<SparePartDetails> findAll() {
        return sparePartDao.findAll();
    }


}
