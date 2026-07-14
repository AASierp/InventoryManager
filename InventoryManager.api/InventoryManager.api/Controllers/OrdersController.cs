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
            Product? product = await _context.Products.FindAsync(order.ProductId);

            if (product == null)
                return NotFound($"Product with ID {order.ProductId} not found.");

            if (product.Quantity < order.Quantity)
                return BadRequest("Not enough inventory to fill order");

            product.Quantity -= order.Quantity;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

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
                return NotFound($"Order with ID {id} not found");
            if(order.Status == "Cancelled")
                return BadRequest("Order is already cancelled");

            Product? product = await _context.Products.FindAsync(order.ProductId);

            if (product == null)
                return NotFound($"Product with ID {order.ProductId} not found.");
            
            order.Status = "Cancelled";
            product.Quantity += order.Quantity;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
