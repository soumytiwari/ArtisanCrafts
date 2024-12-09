// Backend Enhancements for Search and Filter
// API for Searching and Filtering Orders

router.get('/orders', async (req, res) => {
    const { search, status } = req.query;
    const whereClause = {};
  
    if (search) {
      whereClause.id = { [Op.iLike]: `%${search}%` };
      whereClause.user_id = { [Op.iLike]: `%${search}%` };
    }
  
    if (status) {
      whereClause.status = status;
    }
  
    const orders = await Orders.findAll({ where: whereClause });
    res.json(orders);
  });