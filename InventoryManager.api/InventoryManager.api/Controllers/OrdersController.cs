using InventoryManager.api.DataAccessLayer;
using InventoryManager.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


namespace InventoryManager.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(AppDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PlaceOrder(Order order)
        {

            if(order.Quantity <= 0)
            {
                _logger.LogWarning("Order rejected due to invalid order quantity. Product {ProductId} Quantity {Quantity}", order.ProductId, order.Quantity);
                return BadRequest("Order quantity must be greater than zero.");
            }

            if(order.ProductId <= 0)
            {
                return BadRequest("Product ID must be greater than zero.");
            }

            Product? product = await _context.Products.FindAsync(order.ProductId);

            if (product == null)
                return NotFound($"Product with ID {order.ProductId} not found.");

            if (product.Quantity < order.Quantity)
            {
                _logger.LogWarning("Order rejected due to insufficient inventory. Product {ProductId} requested {RequestedQuantity}, available {AvailableQuantity}", order.ProductId, order.Quantity, product.Quantity);
                return BadRequest("Not enough inventory to fill order");
            }

            product.Quantity -= order.Quantity;

            order.Status = "Placed";
            order.OrderDate = DateTime.UtcNow;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Order {OrderId} placed for product {ProductId}. Quantity: {Quantity}", order.Id, order.ProductId, order.Quantity);


            return CreatedAtAction(nameof(GetOrder), new {id = order.Id }, order);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            Order? order = await _context.Orders.Include(o => o.Product).FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return order;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.Product).ToListAsync();
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelOrder(int id)
        {
            Order? order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                _logger.LogWarning("Cancel failed. Order {OrderId} not found.", id);
                return NotFound($"Order with ID {id} not found");
            }
               
            if(order.Status == "Canceled")
            {
                _logger.LogWarning("Cancel failed. Order {OrderId} already canceled.", id);
                return BadRequest("Order is already canceled");
            }

            Product? product = await _context.Products.FindAsync(order.ProductId);

            if (product == null)
            {
                _logger.LogWarning("Cancel Failed. Product {ProductId} for Order {OrderId} not found.", order.ProductId, order.Id);
                return NotFound($"Product with ID {order.ProductId} not found.");
            }
               
            
            order.Status = "Canceled";
            product.Quantity += order.Quantity;

            await _context.SaveChangesAsync();

            _logger.LogInformation("Order {OrderId} canceled successfully. Restored {Quantity} units to Product {ProductId}.", order.Id, order.Quantity, order.ProductId);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            Order? order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                _logger.LogWarning("Delete Failed. Order {OrderId} not found.", id);
                return NotFound($"Order with ID {id} not found");
            }
            if (order.Status != "Canceled")
            {
                _logger.LogWarning("Delete Failed. Order {OrderId} is not canceled.", id);
                return BadRequest("Only canceled orders can be deleted");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Order {OrderId} deleted successfully.", id);
            return NoContent();
        }
    }
}
