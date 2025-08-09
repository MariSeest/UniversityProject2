package it.unito.cloudnative.ticketing.controller;

import it.unito.cloudnative.ticketing.model.Ticket;
import it.unito.cloudnative.ticketing.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permette al frontend React di chiamare le API
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
