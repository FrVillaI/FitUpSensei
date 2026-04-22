using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("ejercicios")]
public class Ejercicio
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Column("categoria")]
    public string? Categoria { get; set; }

    [Column("musculos_implicados")]
    public string[] MusculosImplicados { get; set; } = [];

    [Column("descripcion")]
    public string? Descripcion { get; set; }

    [Column("foto_url")]
    public string? FotoUrl { get; set; }

    [Column("video_youtube_id")]
    public string? VideoYoutubeId { get; set; }

    [Column("es_global")]
    public bool EsGlobal { get; set; }

    [Column("creado_por")]
    public Guid? CreadoPor { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
