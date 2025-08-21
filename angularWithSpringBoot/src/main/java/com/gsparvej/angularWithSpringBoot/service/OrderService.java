package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.dto.*;
import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import com.gsparvej.angularWithSpringBoot.repository.IBuyerRepo;
import com.gsparvej.angularWithSpringBoot.repository.IEmployeeRepo;
import com.gsparvej.angularWithSpringBoot.repository.IOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private IBomStyleRepo bomStyleRepo;

    @Autowired
    private IBuyerRepo buyerRepo;

    @Autowired
    private IEmployeeRepo employeeRepo;

    @Autowired
    private IOrderRepo orderRepo;


    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }


    public Optional<Order> getOrderById(Integer id) {
        return orderRepo.findById(id);
    }
    public Order saveOrUpdate(Order order, BomStyle bomStyle, Buyer buyer) {
        // Relations
        order.setBomStyle(bomStyle);
        order.setBuyer(buyer);

        // SubTotal Calculation (all sizes * unit price)
        double subTotal =
                (order.getShortSmallSize() * order.getShortSPrice()) +
                        (order.getShortMediumSize() * order.getShortMPrice()) +
                        (order.getShortLargeSize() * order.getShortLPrice()) +
                        (order.getShortXLSize() * order.getShortXLPrice()) +
                        (order.getFullSmallSize() * order.getFullSPrice()) +
                        (order.getFullMediumSize() * order.getFullMPrice()) +
                        (order.getFullLargeSize() * order.getFullLPrice()) +
                        (order.getFullXLSize() * order.getFullXLPrice());

        order.setSubTotal(subTotal);


        double vatAmount = order.getVat() != 0 ? order.getVat() : 0;
        double total = subTotal + vatAmount;
        order.setTotal(total);

        // Due Amount
        double paidAmount = order.getPaidAmount() != 0 ? order.getPaidAmount() : 0;
        double dueAmount = total - paidAmount;
        order.setDueAmount(dueAmount);

        return orderRepo.save(order);
    }


    public void deleteById(Integer id) {
        orderRepo.deleteById(id);
    }
    public Order getProfileById(Integer id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }


    public List<OrderResponseDTO> getAllOrderResponseDTOS() {
        return orderRepo.findAll().stream().map(order -> {
            OrderResponseDTO dto = new OrderResponseDTO();
            dto.setId(order.getId());

            dto.setDeliveryDate(order.getDeliveryDate());

            Buyer buyer = order.getBuyer();
            if (buyer != null) {
                BuyerResponseDTO buyerResponseDTO = new BuyerResponseDTO();
                buyerResponseDTO.setId(buyer.getId());
                buyerResponseDTO.setName(buyer.getName());

                dto.setBuyer(buyerResponseDTO);


            }
            return dto;
        }).toList();
    }






}
